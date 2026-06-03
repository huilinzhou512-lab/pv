const referenceGroups = [
  {
    title: "政策与规范",
    intro: "用于说明分布式光伏、建筑可再生能源和新型储能的政策依据。",
    items: [
      {
        title: "分布式光伏发电开发建设管理办法",
        source: "国家能源局 / 中国政府网，2025",
        href: "https://www.gov.cn/gongbao/2025/issue_11946/202503/content_7015853.html",
        note: "适合引用项目分类、接网、备案和建筑物附属场所建设要求。",
      },
      {
        title: "建筑节能与可再生能源利用通用规范 GB 55015-2021",
        source: "住房和城乡建设部，2021",
        href: "https://www.mohurd.gov.cn/gongkai/zc/wjk/art/2021/art_17339_762460.html",
        note: "适合支撑建筑节能、可再生能源利用和设计阶段规范依据。",
      },
      {
        title: "关于促进新时代新能源高质量发展的实施方案",
        source: "国务院办公厅转发，2022",
        href: "https://www.mee.gov.cn/zcwj/gwywj/202205/t20220530_983840.shtml",
        note: "适合说明光伏与新型储能在新能源发展中的政策背景。",
      },
      {
        title: "“十四五”新型储能发展实施方案",
        source: "国家发展改革委 / 国家能源局，2022",
        href: "https://www.ndrc.gov.cn/xxgk/zcfb/tz/202203/t20220321_1319772.html",
        note: "适合支撑储能配置、规模化应用和新型电力系统相关表述。",
      },
    ],
  },
  {
    title: "官网数据",
    intro: "用于校核碳排放、碳足迹和电力排放因子等计算参数。",
    items: [
      {
        title: "2024 年电力碳足迹因子数据公告",
        source: "生态环境部 / 国家统计局 / 国家能源局，2025",
        href: "https://www.mee.gov.cn/xxgk2018/xxgk/xxgk01/202510/t20251024_1130734.html",
        note: "适合后续更新碳排放测算中的电力碳足迹因子。",
      },
      {
        title: "电力二氧化碳排放因子工作进展",
        source: "生态环境部，2025",
        href: "https://www.mee.gov.cn/hdjl/cjwt/202509/t20250915_1130185.shtml",
        note: "适合说明全国、区域和省级电力排放因子的发布口径。",
      },
      {
        title: "关于加快推动新型储能发展的指导意见",
        source: "国家发展改革委 / 国家能源局，2021",
        href: "https://www.gov.cn/zhengce/zhengceku/2021-07/24/content_5627088.htm",
        note: "适合说明用户侧储能、示范项目和产业政策背景。",
      },
    ],
  },
  {
    title: "研究文献",
    intro: "用于补充建筑光伏一体化、屋面与立面光伏潜力、BIPV 性能评价等论文依据。",
    items: [
      {
        title: "A comprehensive review on design of building integrated photovoltaic system",
        source: "Energy and Buildings，2017",
        href: "https://www.sciencedirect.com/science/article/pii/S0378778816305667",
        note: "适合引用 BIPV 产品分类、建筑设计整合方式与设计影响因素。",
      },
      {
        title: "Potential of BIPV/BAPV for adaptive less energy-hungry building skin",
        source: "Journal of Cleaner Production，2021",
        href: "https://www.sciencedirect.com/science/article/pii/S0959652620333886",
        note: "适合区分建筑一体化光伏与建筑附着式光伏的应用边界。",
      },
      {
        title: "Performance Improvement for Building Integrated Photovoltaics in Practice",
        source: "Energies，2021",
        href: "https://www.mdpi.com/1996-1073/14/1/178",
        note: "适合补充组件选择、温度管理、遮挡和实际性能优化依据。",
      },
      {
        title: "A Review of the Energy Performance and Life-Cycle Assessment of BIPV Systems",
        source: "Energies，2018",
        href: "https://www.mdpi.com/1996-1073/11/11/3157",
        note: "适合补充 BIPV 能源性能、生命周期评价和环境收益说明。",
      },
    ],
  },
];

export default function ReferencesPage() {
  return (
    <section className="band">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="tag">07 参考文件</div>
            <h2>政策、官网文件与研究文献索引</h2>
          </div>
          <p>先放入光伏布置、储能配置、自给率与碳排放测算常用的参考入口；后续可继续补充上传的政策文件、规范 PDF 和论文资料。</p>
        </div>

        <div className="reference-list">
          {referenceGroups.map((group) => (
            <section className="panel reference-group" key={group.title}>
              <div className="reference-head">
                <div>
                  <h3>{group.title}</h3>
                  <p>{group.intro}</p>
                </div>
              </div>
              <div className="file-list">
                {group.items.map((item) => (
                  <a className="file-row" href={item.href} target="_blank" rel="noreferrer" key={item.href}>
                    <span className="file-icon" />
                    <span className="file-main">
                      <b>{item.title}</b>
                      <span>{item.note}</span>
                    </span>
                    <span className="file-source">{item.source}</span>
                  </a>
                ))}
              </div>
            </section>
          ))}

          <section className="panel upload-placeholder">
            <h3>待上传文件</h3>
            <p>后续上传的政策 PDF、官网附件、论文原文或本地整理表，可以继续放到这里并按“政策与规范 / 官网数据 / 研究文献”归类。</p>
            <div className="note">建议文件命名包含年份、发布机构和主题，例如：2025-国家能源局-分布式光伏发电开发建设管理办法.pdf。</div>
          </section>
        </div>
      </div>
    </section>
  );
}
