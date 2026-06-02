import Link from "next/link";

export default function HomePage() {
  return (
    <section className="home-screen">
      <div className="container hero-grid">
        <div>
          <div className="badge">
            <span className="badge-dot" />
            面向建筑设计阶段的光伏储能查询应用
          </div>
          <h1>光伏设计查询</h1>
          <p className="lead">
            输入办公空间的面积、可用界面、负荷强度与设计目标，快速查询光伏布置面积、
            储能体积、能源自给率、碳排放和光储配置建议。
          </p>
          <div className="quick-grid">
            <Link className="quick-card" href="/pv">
              <span className="ico pv" />
              <b>光伏布置</b>
              <span>屋面、阳台、立面及光伏幕墙二级分类</span>
            </Link>
            <Link className="quick-card" href="/storage">
              <span className="ico storage" />
              <b>储能布置</b>
              <span>由容量估算体积与空间占用形式</span>
            </Link>
            <Link className="quick-card" href="/config">
              <span className="ico config" />
              <b>配置推荐</b>
              <span>按不同目标输出光储组合建议</span>
            </Link>
          </div>
        </div>
        <div>
          <div className="panel visual">
            <figure className="figure-frame visual-figure">
              <img src="/assets/illustrations/home-energy-building.png" alt="办公建筑光伏与储能系统轴测示意图" />
            </figure>
          </div>
          <div className="mini-results">
            <div>
              <b>屋面优先</b>
              <span>主要光伏界面</span>
            </div>
            <div>
              <b>立面补充</b>
              <span>含光伏幕墙</span>
            </div>
            <div>
              <b>容量转译</b>
              <span>储能空间判断</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
