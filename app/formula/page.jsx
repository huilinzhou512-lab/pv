import FormulaItem from "@/components/FormulaItem";

export default function FormulaPage() {
  return (
    <section className="band">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="tag">06 计算公式</div>
            <h2>设计查询所使用的核心公式</h2>
          </div>
          <p>公式页面补充各模块的计算依据，便于在汇报和后续论文写作中说明参数来源与逻辑关系。</p>
        </div>
        <div className="formula-list">
          <FormulaItem title="光伏装机与发电量" open>
            <code>PV_capacity = A_pv × P_density</code>
            <code>E_pv = PV_capacity × H_year × PR</code>
            A_pv 为光伏可用面积，P_density 为单位面积装机量，H_year 为年太阳辐射等效小时，PR 为系统效率系数。
          </FormulaItem>
          <FormulaItem title="储能体积与空间占用">
            <code>V_bat = C_bat / D_energy</code>
            <code>A_space = V_bat / H_eff × K_safe</code>
            C_bat 为储能容量，D_energy 为设备能量密度，H_eff 为设备有效高度，K_safe 为维护与安全系数。
          </FormulaItem>
          <FormulaItem title="能源自给率">
            <code>Self-sufficiency = (E_direct + E_storage) / E_load × 100%</code>
            E_direct 为光伏直接自用电量，E_storage 为储能放电量，E_load 为建筑全年用电量。
          </FormulaItem>
          <FormulaItem title="碳排放测算">
            <code>C_net = (E_in - E_out) × EF_grid</code>
            E_in 为从电网购电量，E_out 为余电上网量，EF_grid 为区域电网平均碳排放因子。
          </FormulaItem>
        </div>
      </div>
    </section>
  );
}
