"use client";

import { useState } from "react";
import Field from "@/components/Field";
import ResultPanel from "@/components/ResultPanel";
import { DESIGN_CONSTANTS, calculateConfig, fmt, fmt1 } from "@/lib/calculations";

const targets = [
  { id: "balance", label: "均衡推荐" },
  { id: "self", label: "提高自给率" },
  { id: "carbon", label: "降低碳排放" },
  { id: "space", label: "空间优先" },
];

export default function ConfigPage() {
  const [targetMode, setTargetMode] = useState("balance");
  const [fields, setFields] = useState({
    officeArea: 300,
    loadIntensity: 105,
    configRoofArea: 220,
    configRoofRatio: 60,
    facadeArea: 80,
    facadeRatio: 25,
    configPvDensity: 0.2,
    candidateStorage: 35,
  });
  const result = calculateConfig(fields, targetMode);
  const updateField = (name, value) => setFields((current) => ({ ...current, [name]: value }));

  return (
    <section className="band">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="tag">03 光伏储能配置推荐</div>
            <h2>按设计目标输出较合适的光储组合</h2>
          </div>
          <p>输入办公空间基本物理参数，根据不同目标得到模拟后较合适的光伏储能配置建议。当前为示意性前端模型，后续可接入全年模拟结果。</p>
        </div>
        <div className="calc-grid">
          <div className="panel">
            <h3>基础参数输入</h3>
            <div className="form-grid">
              <Field label="办公建筑面积 m²" value={fields.officeArea} min="0" max="100000" step="1" onChange={(value) => updateField("officeArea", value)} />
              <Field label="年用电强度 kWh/m²" value={fields.loadIntensity} min="0" max="500" step="1" onChange={(value) => updateField("loadIntensity", value)} />
              <Field label="屋面有效面积 m²" value={fields.configRoofArea} min="0" max="100000" step="1" onChange={(value) => updateField("configRoofArea", value)} />
              <Field label="屋面可铺设比例 %" value={fields.configRoofRatio} min="0" max="100" step="1" onChange={(value) => updateField("configRoofRatio", value)} />
              <Field label="立面补充面积 m²" value={fields.facadeArea} min="0" max="100000" step="1" onChange={(value) => updateField("facadeArea", value)} />
              <Field label="立面可用比例 %" value={fields.facadeRatio} min="0" max="100" step="1" onChange={(value) => updateField("facadeRatio", value)} />
              <Field label="单位面积装机 kWp/m²" value={fields.configPvDensity} min="0" max="0.5" step="0.01" onChange={(value) => updateField("configPvDensity", value)} />
              <Field label="储能候选容量 kWh" value={fields.candidateStorage} min="0" max="500" step="1" onChange={(value) => updateField("candidateStorage", value)} />
            </div>
            <div className="target-row">
              {targets.map((target) => (
                <button key={target.id} className={`target ${targetMode === target.id ? "active" : ""}`} type="button" onClick={() => setTargetMode(target.id)}>
                  {target.label}
                </button>
              ))}
            </div>
          </div>

          <ResultPanel
            title="推荐结果"
            bigValue={result.label}
            bigLabel="光伏储能配置策略"
            rows={[
              { label: "推荐光伏面积", value: `${fmt(result.pvArea)} m²` },
              { label: "推荐光伏装机", value: `${fmt1(result.capacity)} kWp` },
              { label: "推荐储能容量", value: `${fmt1(result.storage)} kWh` },
              { label: "估算能源自给率", value: `${result.selfRate.toFixed(1)}%` },
              { label: "估算碳减排率", value: `${result.carbonRate.toFixed(1)}%` },
            ]}
            note={`${result.note} 自给率与减排率按 ${DESIGN_CONSTANTS.pvAnnualEquivalentHours} 小时等效发电和典型储能支撑系数估算，输入异常时自动按安全边界处理。`}
          />
        </div>
      </div>
    </section>
  );
}
