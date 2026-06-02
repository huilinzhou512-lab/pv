export function fmt(value) {
  return Number(value).toLocaleString("zh-CN", { maximumFractionDigits: 0 });
}

export function fmt1(value) {
  return Number(value).toLocaleString("zh-CN", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

export function calculatePv({ area, density, pr }) {
  const usable = Number(area);
  const capacity = usable * Number(density);
  const annual = capacity * 1249 * Number(pr);

  return { usable, capacity, annual };
}

export function calculateStorage({ kwh, density, height, safe }) {
  const volume = Number(kwh) / Number(density);
  const footprint = volume / Number(height);
  const area = footprint * Number(safe);
  let activeForm = "formCabinet";
  let advice = "当前容量较适合储能柜布置，建议预留检修面、散热条件和消防边界。";

  if (Number(kwh) <= 15) {
    activeForm = "formRack";
    advice = "当前容量较适合储能架或小型模块化布置，适用于实验平台和局部负荷验证。";
  } else if (Number(kwh) > 80) {
    activeForm = "formRoom";
    advice = "当前容量建议设置独立储能间，重点校核防火分隔、通风散热和设备搬运路径。";
  }

  return { volume, footprint, area, activeForm, advice };
}

export function calculateConfig(fields, targetMode) {
  const load = Number(fields.officeArea) * Number(fields.loadIntensity);
  const roofArea = (Number(fields.configRoofArea) * Number(fields.configRoofRatio)) / 100;
  const facadeArea = (Number(fields.facadeArea) * Number(fields.facadeRatio)) / 100;
  let pvArea = roofArea + facadeArea;
  let storage = Number(fields.candidateStorage);
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

  const capacity = pvArea * Number(fields.configPvDensity);
  const pvAnnual = capacity * 1249 * 0.8;
  const direct = Math.min(pvAnnual * 0.62, load);
  const storageSupport = Math.min(storage * 95, Math.max(load - direct, 0));
  const selfRate = Math.min(((direct + storageSupport) / load) * 100, 95);
  const carbonRate = Math.min(((direct + storageSupport * 0.86) / load) * 100, 92);

  return { label, note, pvArea, capacity, storage, selfRate, carbonRate };
}

export function calculateSelf({ annualLoad, annualPv, directUse, storageDischarge }) {
  const load = Number(annualLoad);
  const pv = Number(annualPv);
  const directRatio = Number(directUse) / 100;
  const direct = pv * directRatio;
  const self = Math.min(direct + Number(storageDischarge), load);
  const grid = Math.max(load - self, 0);
  const selfRate = load > 0 ? (self / load) * 100 : 0;

  return { directRatio, direct, self, grid, selfRate };
}

export function calculateCarbon({ gridIn, gridOut, carbonFactor, baselineCarbon }) {
  const netGrid = Math.max(Number(gridIn) - Number(gridOut), 0);
  const carbon = netGrid * Number(carbonFactor);
  const saved = Math.max(Number(baselineCarbon) - carbon, 0);
  const rate = Number(baselineCarbon) > 0 ? (saved / Number(baselineCarbon)) * 100 : 0;

  return { netGrid, carbon, saved, rate };
}
