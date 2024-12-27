export default {
    id: "root",
    topic: "Product Planning",
    children: [
        {
            id: "market-analysis",
            topic: "市场分析市场分析市场分析市场分析市场分析",
            direction: "right",
            children: [
                {
                    id: "target-users",
                    topic: "目标用户 Target Users",
                    children: [
                        {
                            id: "demographics", topic: "人口统计 Demographics", children: [
                                { id: "age", topic: "年龄分布 Age Distribution" },
                                { id: "gender", topic: "性别比例 Gender Ratio" },
                                { id: "education", topic: "教育程度 Education Level" },
                                { id: "income", topic: "收入水平 Income Level" },
                                { id: "location", topic: "地理分布 Geographic Distribution" }
                            ]
                        },
                        { id: "behaviors", topic: "用户行为分析 User Behavior Analysis 用户行为分析 User Behavior Analysis" },
                        {
                            id: "pain-points", topic: "痛点", children: [
                                { id: "usage-difficulty", topic: "使用难度 Usage Difficulty" },
                                { id: "time-consuming", topic: "耗时问题 Time-consuming Issues" },
                                { id: "cost-issues", topic: "成本问题 Cost Issues" },
                                { id: "quality-concerns", topic: "质量问题 Quality Concerns" },
                                { id: "service-gaps", topic: "服务空缺 Service Gaps" }
                            ]
                        },
                        {
                            id: "needs", topic: "需求 Needs and Wants", children: [
                                { id: "functional-needs", topic: "功能需求 Functional Needs" },
                                { id: "emotional-needs", topic: "情感需求 Emotional Needs" },
                                { id: "social-needs", topic: "社交需求 Social Needs" },
                                { id: "convenience", topic: "便利性需求 Convenience Needs" },
                                { id: "value-needs", topic: "价值需求 Value Needs" }
                            ]
                        }
                    ]
                },
                {
                    id: "competition",
                    topic: "竞品分析",
                    children: [
                        { id: "direct", topic: "直接竞争对手 Direct Competitors 直接竞争对手 Direct Competitors 直接竞争对手" },
                        { id: "indirect", topic: "间接竞争" },
                        { id: "advantages", topic: "竞争优势" }
                    ]
                }
            ]
        },
        {
            id: "product-features",
            topic: "产品功能 Features",
            children: [
                {
                    id: "core-features",
                    topic: "核心功能",
                    children: [
                        { id: "feature-1", topic: "Feature One 功能一 Feature One 功能一 Feature One 功能一 Feature One 功能一" },
                        { id: "feature-2", topic: "Feature Two" },
                        { id: "feature-3", topic: "功能三" }
                    ]
                }
            ]
        },
        {
            id: "development",
            topic: "研发 Development",
            direction: "left",
            children: [
                {
                    id: "tech-stack",
                    topic: "技术栈 Tech Stack",
                    children: [
                        { id: "frontend", topic: "前端 Frontend Technologies 前端技术栈 Frontend Technologies" },
                        { id: "backend", topic: "后端" },
                        { id: "infrastructure", topic: "基础设施" }
                    ]
                },
                {
                    id: "timeline",
                    topic: "Timeline 时间线",
                    children: [
                        { id: "phase-1", topic: "Phase 1 阶段一" },
                        { id: "phase-2", topic: "阶段二 Phase 2 阶段二 Phase 2" },
                        { id: "phase-3", topic: "Phase 3" }
                    ]
                }
            ]
        },
        {
            id: "resources",
            topic: "资源配置",
            children: [
                { id: "human", topic: "人力资源 Human Resources 人力资源 Human Resources 人力资源 Human Resources" },
                { id: "financial", topic: "Financial Resources" },
                { id: "tools", topic: "工具支持" }
            ]
        },
        {
            id: "metrics",
            topic: "指标 Metrics",
            children: [
                { id: "kpi-1", topic: "KPI One" },
                { id: "kpi-2", topic: "关键指标二 Key Performance Indicator Two" },
                { id: "kpi-3", topic: "KPI Three 关键指标三 KPI Three 关键指标三" }
            ]
        },
        {
            id: "risks",
            topic: "风险管理",
        },
        {
            id: "quality",
            topic: "质量保证",
        }
    ]
};
