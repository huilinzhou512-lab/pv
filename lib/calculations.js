export const DESIGN_CONSTANTS = {
  pvAnnualEquivalentHours: 1249,
  defaultPerformanceRatio: 0.8,
  defaultCarbonFactor: 0.5703,
  pvDirectUseRatio: 0.62,
  storageAnnualSupportPerKwh: 95,
  storageCarbonBenefitRatio: 0.86,
  maxSelfRate: 95,
  maxCarbonRate: 92,
  storageFormThresholds: {
    rackMaxKwh: 15,
    roomMinKwh: 80,
  },
};

function safeNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function clamp(value, min = 0, max = Number.POSITIVE_INFINITY) {
  return Math.min(Math.max(safeNumber(value), min), max);
}

function nonNegative(value) {
  return clamp(value, 0);
}

function positive(value, fallback) {
  const number = safeNumber(value, fallback);
  return number > 0 ? number : fallback;
}

function ratio(value, fallback = 0) {
  return clamp(safeNumber(value, fallback), 0, 1);
}

function percent(value, fallback = 0) {
  return clamp(safeNumber(value, fallback), 0, 100);
}

export function fmt(value) {
  return safeNumber(value).toLocaleString("zh-CN", { maximumFractionDigits: 0 });
}

export function fmt1(value) {
  return safeNumber(value).toLocaleString("zh-CN", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

export function calculatePv({ area, density, pr }) {
  const usable = nonNegative(area);
  const capacity = usable * nonNegative(density);
  const annual = capacity * DESIGN_CONSTANTS.pvAnnualEquivalentHours * ratio(pr, DESIGN_CONSTANTS.defaultPerformanceRatio);

  return { usable, capacity, annual };
}

export function calculateStorage({ kwh, density, height, safe }) {
  const capacity = nonNegative(kwh);
  const energyDensity = positive(density, 1);
  const effectiveHeight = positive(height, 1);
  const safeFactor = positive(safe, 1);
  const volume = capacity / energyDensity;
  const footprint = volume / effectiveHeight;
  const area = footprint * safeFactor;
  let activeForm = "formCabinet";
  let advice = "当前容量较适合储能柜布置，建议预留检修面、散热条件和消防边界。";

  if (capacity <= DESIGN_CONSTANTS.storageFormThresholds.rackMaxKwh) {
    activeForm = "formRack";
    advice = "当前容量较适合储能架或小型模块化布置，适用于实验平台和局部负荷验证。";
  } else if (capacity > DESIGN_CONSTANTS.storageFormThresholds.roomMinKwh) {
    activeForm = "formRoom";
    advice = "当前容量建议设置独立储能间，重点校核防火分隔、通风散热和设备搬运路径。";
  }

  return { volume, footprint, area, activeForm, advice };
}

export function calculateConfig(fields, targetMode) {
  const load = nonNegative(fields.officeArea) * nonNegative(fields.loadIntensity);
  const roofArea = (nonNegative(fields.configRoofArea) * percent(fields.configRoofRatio)) / 100;
  const facadeArea = (nonNegative(fields.facadeArea) * percent(fields.facadeRatio)) / 100;
  let pvArea = roofArea + facadeArea;
  let storage = nonNegative(fields.candidateStorage);
  let label = "均衡型";
  let note = "适合空间条件相对稳定的办公建筑，兼顾屋面光伏利用、储能支撑与空间占用。";

  if (targetMode === "self") {
    pvArea *= 1.12;
    storage *= 1.25;
    label = "高自给型";
    note = "优先提高建筑自身供能比例，适合希望减少电网依赖的办公空间。";
  }

  if (targetMode === "carbon") {
    pvArea *= 1.18;
    storage *= 1.12;
    label = "低碳优先型";
    note = "优先提高光伏发电贡献，适合以碳减排率为主要目标的方案比选。";
  }

  if (targetMode === "space") {
    pvArea *= 0.82;
    storage *= 0.72;
    label = "空间优先型";
    note = "控制设备占地和空间折减，适合屋面或设备空间较紧张的办公建筑。";
  }

  const capacity = pvArea * nonNegative(fields.configPvDensity);
  const pvAnnual = capacity * DESIGN_CONSTANTS.pvAnnualEquivalentHours * DESIGN_CONSTANTS.defaultPerformanceRatio;
  const direct = Math.min(pvAnnual * DESIGN_CONSTANTS.pvDirectUseRatio, load);
  const storageSupport = Math.min(storage * DESIGN_CONSTANTS.storageAnnualSupportPerKwh, Math.max(load - direct, 0));
  const supported = direct + storageSupport;
  const selfRate = load > 0 ? Math.min((supported / load) * 100, DESIGN_CONSTANTS.maxSelfRate) : 0;
  const carbonRate =
    load > 0
      ? Math.min(((direct + storageSupport * DESIGN_CONSTANTS.storageCarbonBenefitRatio) / load) * 100, DESIGN_CONSTANTS.maxCarbonRate)
      : 0;

  return { label, note, pvArea, capacity, storage, selfRate, carbonRate };
}

export function calculateSelf({ annualLoad, annualPv, directUse, storageDischarge }) {
  const load = nonNegative(annualLoad);
  const pv = nonNegative(annualPv);
  const directRatio = percent(directUse) / 100;
  const storage = nonNegative(storageDischarge);
  const direct = pv * directRatio;
  const self = Math.min(direct + storage, load);
  const grid = Math.max(load - self, 0);
  const selfRate = load > 0 ? (self / load) * 100 : 0;

  return { directRatio, direct, self, grid, selfRate };
}

export function calculateCarbon({ gridIn, gridOut, carbonFactor, baselineCarbon }) {
  const netGrid = Math.max(nonNegative(gridIn) - nonNegative(gridOut), 0);
  const factor = nonNegative(carbonFactor);
  const baseline = nonNegative(baselineCarbon);
  const carbon = netGrid * factor;
  const saved = Math.max(baseline - carbon, 0);
  const rate = baseline > 0 ? (saved / baseline) * 100 : 0;

  return { netGrid, carbon, saved, rate };
}
