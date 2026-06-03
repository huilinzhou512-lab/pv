"use client";

import { useState } from "react";
import Field from "@/components/Field";
import { DESIGN_CONSTANTS, calculatePv, fmt, fmt1 } from "@/lib/calculations";

const facadeOptions = {
  normal: {
    image: "/assets/illustrations/pv-facade.png",
    alt: "普通立面光伏轴测示意图",
    title: "普通立面光伏示意",
    text: "适合作为补充发电界面，需判断朝向、遮挡、构造固定和建筑表达。",
  },
  balcony: {
    image: "/assets/illustrations/pv-balcony.png",
    alt: "阳台光伏布置轴测示意图",
    title: "阳台光伏布置示意",
    text: "作为立面二级分类，适合遮阳板、栏板与局部构件一体化，需兼顾采光、眺望与立面秩序。",
  },
  curtain: {
    image: "/assets/illustrations/pv-curtain-wall.png",
    alt: "光伏幕墙系统轴测示意图",
    title: "光伏幕墙系统示意",
    text: "作为立面二级分类，后续需细化幕墙构造、透光率、热工性能与增量成本。",
  },
};

const areaOptions = [20, 40, 60, 80, 100];

export default function PvPage() {
  const [tab, setTab] = useState("roofTab");
  const [facade, setFacade] = useState("normal");
  const [fields, setFields] = useState({ area: 20, density: 0.2, pr: DESIGN_CONSTANTS.defaultPerformanceRatio });
  const result = calculatePv(fields);
  const facadeData = facadeOptions[facade];

  const updateField = (name, value) => setFields((current) => ({ ...current, [name]: value }));

  return (
    <section className="band">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="tag">01 光伏布置设计</div>
            <h2>把建筑界面转化为光伏可用面积</h2>
          </div>
          <p>根据建筑屋面与立面条件，估算可铺设面积与装机容量。阳台光伏与光伏幕墙归入立面系统，作为立面二级分类进行表达。</p>
        </div>
        <div className="grid-2">
          <div className="panel">
            <h3>光伏布置可用界面</h3>
            <p>不同界面对发电效率、建筑形象、维护便利性和空间占用产生不同影响。</p>
            <div className="tabs">
              <button className={`tab-btn ${tab === "roofTab" ? "active" : ""}`} type="button" onClick={() => setTab("roofTab")}>
                屋面
              </button>
              <button className={`tab-btn ${tab === "facadeTab" ? "active" : ""}`} type="button" onClick={() => setTab("facadeTab")}>
                立面
              </button>
            </div>

            <div className={`tab-content ${tab === "roofTab" ? "active" : ""}`}>
              <div className="pv-layout">
                <figure className="figure-frame pv-figure">
                  <img src="/assets/illustrations/pv-roof.png" alt="屋面光伏布置轴测示意图" />
                </figure>
                <div className="side-list">
                  <div>
                    <b>适用性</b>优先布置界面，维护便利，对室内空间影响较小。
                  </div>
                  <div>
                    <b>设计控制</b>检修通道、女儿墙遮挡、消防间距、设备基础。
                  </div>
                  <div>
                    <b>面积表达</b>按设计阶段列举的屋面有效面积进行快速估算。
                  </div>
                </div>
              </div>
            </div>

            <div className={`tab-content ${tab === "facadeTab" ? "active" : ""}`}>
              <figure className="figure-frame diagram-card">
                <img src={facadeData.image} alt={facadeData.alt} />
                <figcaption className="figure-caption">
                  <strong>{facadeData.title}</strong>
                  <span>{facadeData.text}</span>
                </figcaption>
              </figure>
              <div className="sub-choice">
                <button className={facade === "normal" ? "active" : ""} type="button" onClick={() => setFacade("normal")}>
                  普通立面
                </button>
                <button className={facade === "balcony" ? "active" : ""} type="button" onClick={() => setFacade("balcony")}>
                  阳台光伏
                </button>
                <button className={facade === "curtain" ? "active" : ""} type="button" onClick={() => setFacade("curtain")}>
                  光伏幕墙
                </button>
              </div>
            </div>
          </div>

          <div className="panel">
            <h3>光伏布置面积测算</h3>
            <p>将建筑可用界面转化为光伏装机边界，为自给率、碳排放与配置推荐提供输入。</p>
            <div className="form-grid">
              <Field label="建筑屋面有效面积" valueLabel={`${fields.area} m²`} value={fields.area} onChange={(value) => updateField("area", value)}>
                {areaOptions.map((area) => (
                  <option key={area} value={area}>
                    {area} m²
                  </option>
                ))}
              </Field>
              <Field label="单位面积装机 kWp/m²" value={fields.density} min="0" max="0.5" step="0.01" onChange={(value) => updateField("density", value)} />
              <Field label="系统效率系数" value={fields.pr} min="0" max="1" step="0.01" onChange={(value) => updateField("pr", value)} />
            </div>
            <div className="mini-results">
              <div>
                <b>{fmt(result.usable)}</b>
                <span>可用面积 m²</span>
              </div>
              <div>
                <b>{fmt1(result.capacity)}</b>
                <span>估算装机 kWp</span>
              </div>
              <div>
                <b>{fmt(result.annual)}</b>
                <span>年发电量 kWh</span>
              </div>
            </div>
            <div className="note">
              年发电量按“装机容量 × {DESIGN_CONSTANTS.pvAnnualEquivalentHours} 小时 × 系统效率系数”估算。当前为设计阶段快速查询结果，正式论文计算需结合福州全年气象、倾角、方位角和遮挡条件进行 8760 小时修正。
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
