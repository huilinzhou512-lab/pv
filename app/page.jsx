import Link from "next/link";

const quickLinks = [
  {
    href: "/pv",
    icon: "pv",
    title: "光伏布置",
    text: "屋面、立面及光伏幕墙二级分类",
  },
  {
    href: "/storage",
    icon: "storage",
    title: "储能布置",
    text: "由容量估算体积与空间占用形式",
  },
  {
    href: "/self",
    icon: "energy",
    title: "自给率",
    text: "评价光伏与储能对办公负荷的支撑程度",
  },
  {
    href: "/carbon",
    icon: "carbon",
    title: "碳排放",
    text: "从净购电量估算运行碳排放",
  },
  {
    href: "/config",
    icon: "config",
    title: "配置推荐",
    text: "按不同目标输出光储组合建议",
  },
  {
    href: "/formula",
    icon: "formula",
    title: "计算公式",
    text: "查看各模块使用的核心公式",
  },
  {
    href: "/references",
    icon: "reference",
    title: "参考文件",
    text: "政策、官网文件与研究文献索引",
  },
];

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
            {quickLinks.map((item) => (
              <Link className="quick-card" href={item.href} key={item.href}>
                <span className={`ico ${item.icon}`} />
                <b>{item.title}</b>
                <span>{item.text}</span>
              </Link>
            ))}
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
