"use client";

import { useEffect, useState } from "react";
import Field from "@/components/Field";
import ResultPanel from "@/components/ResultPanel";
import { DESIGN_CONSTANTS, calculateCarbon, fmt } from "@/lib/calculations";

export default function CarbonPage() {
  const [fields, setFields] = useState({
    gridIn: 13020,
    gridOut: 5520,
    carbonFactor: DESIGN_CONSTANTS.defaultCarbonFactor,
    baselineCarbon: 17964,
  });
  const result = calculateCarbon(fields);
  const updateField = (name, value) => setFields((current) => ({ ...current, [name]: value }));

  useEffect(() => {
    const storedGridIn = window.localStorage.getItem("pv-design-grid-in");
    if (storedGridIn) {
      updateField("gridIn", storedGridIn);
    }
  }, []);

  return (
    <section className="band">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="tag">05 碳排放测算</div>
            <h2>从净购电量估算办公空间运行碳排放</h2>
          </div>
          <p>碳排放测算将建筑运行用电转化为碳指标，用于判断光伏与储能系统对零碳目标的贡献。</p>
        </div>
        <div className="calc-grid">
          <div className="panel">
            <h3>碳排放参数</h3>
            <div className="form-grid">
              <Field label="从电网购电量 kWh" value={fields.gridIn} min="0" max="10000000" step="100" onChange={(value) => updateField("gridIn", value)} />
              <Field label="余电上网量 kWh" value={fields.gridOut} min="0" max="10000000" step="100" onChange={(value) => updateField("gridOut", value)} />
              <Field label="电网碳因子 kgCO2/kWh" value={fields.carbonFactor} min="0" max="2" step="0.0001" onChange={(value) => updateField("carbonFactor", value)} />
              <Field label="基准排放量 kgCO2" value={fields.baselineCarbon} min="0" max="10000000" step="100" onChange={(value) => updateField("baselineCarbon", value)} />
            </div>
            <figure className="figure-frame carbon-figure">
              <img src="/assets/illustrations/carbon-comparison.png" alt="碳排放与减排关系对比示意图" />
            </figure>
          </div>

          <ResultPanel
            title="净碳排放结果"
            bigValue={fmt(result.carbon)}
            bigLabel="kgCO2 / 年"
            rows={[
              { label: "净购电量", value: `${fmt(result.netGrid)} kWh` },
              { label: "碳减排量", value: `${fmt(result.saved)} kgCO2` },
              { label: "碳减排率", value: `${result.rate.toFixed(1)}%` },
            ]}
            note={`净碳排放按“净购电量 × 电网碳因子”估算；默认碳因子为 ${DESIGN_CONSTANTS.defaultCarbonFactor} kgCO2/kWh，基准排放为 0 时减排率显示为 0。`}
          />
        </div>
      </div>
    </section>
  );
}
