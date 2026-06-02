"use client";

import { useState } from "react";
import Field from "@/components/Field";
import { calculateStorage } from "@/lib/calculations";

const forms = [
  {
    id: "formRack",
    image: "/assets/illustrations/storage-rack.png",
    alt: "储能架轴测示意图",
    title: "储能架",
    text: "适合实验平台、小容量或模块化扩展，便于监测和替换。",
  },
  {
    id: "formCabinet",
    image: "/assets/illustrations/storage-cabinet.png",
    alt: "储能柜轴测示意图",
    title: "储能柜",
    text: "适合中小型办公单元，可在设备区、屋顶机房或辅助空间落位。",
  },
  {
    id: "formRoom",
    image: "/assets/illustrations/storage-room.png",
    alt: "储能间轴测示意图",
    title: "储能间",
    text: "适合较大容量系统，需独立空间、消防分隔和通风散热条件。",
  },
];

export default function StoragePage() {
  const [fields, setFields] = useState({ kwh: 30, density: 92, height: 1.8, safe: 2.2 });
  const result = calculateStorage(fields);
  const updateField = (name, value) => setFields((current) => ({ ...current, [name]: value }));

  return (
    <section className="band">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="tag">02 储能布置设计</div>
            <h2>由储能容量估算体积与布置形式</h2>
          </div>
          <p>本页暂不做储能容量推荐，而是根据已知储能容量，估算市面常见储能设备的体积、占地和适宜布置形式。</p>
        </div>
        <div className="grid-2">
          <div className="panel">
            <h3>储能容量转译</h3>
            <p>输入储能容量后，系统根据典型产品能量密度估算设备体积，并考虑维护通道和安全系数得到建筑空间占用。</p>
            <div className="form-grid">
              <Field label="储能容量 kWh" value={fields.kwh} onChange={(value) => updateField("kwh", value)} />
              <Field label="产品类型" value={fields.density} onChange={(value) => updateField("density", value)}>
                <option value="92">磷酸铁锂柜式系统</option>
                <option value="70">铅酸电池架</option>
                <option value="120">高集成液冷柜</option>
              </Field>
              <Field label="设备有效高度 m" value={fields.height} step="0.1" onChange={(value) => updateField("height", value)} />
              <Field label="维护与安全系数" value={fields.safe} step="0.1" onChange={(value) => updateField("safe", value)} />
            </div>
            <div className="mini-results">
              <div>
                <b>{result.volume.toFixed(2)}</b>
                <span>估算体积 m³</span>
              </div>
              <div>
                <b>{result.footprint.toFixed(2)}</b>
                <span>设备投影 m²</span>
              </div>
              <div>
                <b>{result.area.toFixed(2)}</b>
                <span>空间占用 m²</span>
              </div>
            </div>
          </div>

          <div className="panel">
            <h3>储能布置形式选择</h3>
            <p>根据容量等级与空间占用，给出较适宜的储能布置形式。结果为前期设计判断，需结合规范与厂家参数校核。</p>
            <div className="storage-forms">
              {forms.map((form) => (
                <div key={form.id} className={`storage-card ${result.activeForm === form.id ? "active" : ""}`}>
                  <figure className="figure-frame storage-figure">
                    <img src={form.image} alt={form.alt} />
                  </figure>
                  <h4>{form.title}</h4>
                  <p>{form.text}</p>
                </div>
              ))}
            </div>
            <div className="note">{result.advice}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
