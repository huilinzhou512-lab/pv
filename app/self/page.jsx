"use client";

import { useEffect, useState } from "react";
import Field from "@/components/Field";
import ResultPanel from "@/components/ResultPanel";
import { calculateSelf, fmt } from "@/lib/calculations";

export default function SelfPage() {
  const [fields, setFields] = useState({
    annualLoad: 31500,
    annualPv: 24000,
    directUse: 62,
    storageDischarge: 3600,
  });
  const result = calculateSelf(fields);
  const updateField = (name, value) => setFields((current) => ({ ...current, [name]: value }));

  useEffect(() => {
    window.localStorage.setItem("pv-design-grid-in", String(Math.round(result.grid)));
  }, [result.grid]);

  return (
    <section className="band">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="tag">04 能源自给率测算</div>
            <h2>评价光伏与储能对办公负荷的支撑程度</h2>
          </div>
          <p>能源自给率用于判断建筑自身能源系统满足用电需求的比例，是光伏面积与储能容量是否有效的核心指标。</p>
        </div>
        <div className="calc-grid">
          <div className="panel">
            <h3>自给率参数</h3>
            <div className="form-grid">
              <Field label="全年用电量 kWh" value={fields.annualLoad} onChange={(value) => updateField("annualLoad", value)} />
              <Field label="光伏年发电量 kWh" value={fields.annualPv} onChange={(value) => updateField("annualPv", value)} />
              <Field label="光伏直接自用率" valueLabel={`${Math.round(result.directRatio * 100)}%`} type="range" min="30" max="90" value={fields.directUse} onChange={(value) => updateField("directUse", value)} />
              <Field label="储能放电量 kWh" value={fields.storageDischarge} onChange={(value) => updateField("storageDischarge", value)} />
            </div>
            <div className="note">能源自给率 =（光伏直接自用量 + 储能放电量）/ 建筑全年用电量 × 100%。</div>
          </div>

          <ResultPanel
            title="测算结果"
            bigValue={`${result.selfRate.toFixed(1)}%`}
            bigLabel="能源自给率"
            rows={[
              { label: "光伏直接自用量", value: `${fmt(result.direct)} kWh` },
              { label: "储能支撑电量", value: `${fmt(fields.storageDischarge)} kWh` },
              { label: "电网补充电量", value: `${fmt(result.grid)} kWh` },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
