export default {
    id: "root",
    topic: "商业计划书",
    children: [
        {
            id: "target-market",
            topic: "目标市场",
            direction: "right",
            children: [
                {
                    id: "users",
                    topic: "用户",
                    children: [
                        { id: "age", topic: "年龄年龄年龄年龄年龄年龄年龄" },
                        { id: "gender", topic: "性别" },
                        { id: "income", topic: "收入" },
                        { id: "location", topic: "人群" }
                    ]
                },
                {
                    id: "competitors",
                    topic: "竞争者",
                    children: [
                        { id: "brand", topic: "品牌" },
                        { id: "differentiation", topic: "差异化竞争" },
                        { id: "unique", topic: "独特性" },
                        { id: "commercial", topic: "商业化" },
                        { id: "main", topic: "主张" }
                    ]
                }
            ]
        },
        {
            id: "market-strategy",
            topic: "市场策略",
            direction: "left",
            children: [
                {
                    id: "achievement",
                    topic: "成就",
                    children: [
                        { id: "completion-time", topic: "达成时间" },
                        { id: "target-effect", topic: "目标成效" },
                        { id: "short-term", topic: "短期" },
                        { id: "long-term", topic: "长期" }
                    ]
                }
            ]
        },
        {
            id: "management",
            topic: "管理团队",
            direction: "left",
            children: [
                {
                    id: "experience",
                    topic: "经验",
                    children: [
                        { id: "past-achievements", topic: "过往记录" },
                        { id: "self", topic: "自有" },
                        { id: "partner", topic: "合作方" },
                        { id: "other", topic: "其他" }
                    ]
                },
                {
                    id: "ability",
                    topic: "能力",
                    children: [
                        { id: "self-ability", topic: "自有" },
                        { id: "partner-ability", topic: "合作方" },
                        { id: "other-ability", topic: "其他" }
                    ]
                }
            ]
        },
        {
            id: "execution",
            topic: "执行",
            direction: "left",
            children: [
                { id: "feasibility", topic: "可持续性" },
                { id: "vision", topic: "愿景" },
                { id: "risk", topic: "风险评估" }
            ]
        },
        {
            id: "enterprise",
            topic: "企业",
            children: [
                { id: "employees", topic: "员工员工员工员工员工员工员工员工员工员工员工员工员工员工员工员工员工员工员工员工员工员工员工员工员工员工员工员工员工员工员工员工员工员工员工员工员工员工员工员工员工员工" },
                { id: "office", topic: "办公场地" },
                { id: "uniqueness", topic: "独特性" }
            ]
        },
        {
            id: "finance",
            topic: "金融",
            children: [
                { id: "cash", topic: "现金流" },
                { id: "profit", topic: "损益" },
                { id: "balance", topic: "收支平衡" },
                { id: "working-capital", topic: "启动资金" },
                { id: "forecast", topic: "预测" }
            ]
        },
        {
            id: "product",
            topic: "产品",
            children: [
                { id: "advantages", topic: "功能和强点" },
                { id: "usage", topic: "使用场景?" },
                { id: "how", topic: "如何使用?" }
            ]
        },
        {
            id: "others",
            topic: "其他",
            children: [
                { id: "first-impression", topic: "最初的全套事项" },
                { id: "first-period", topic: "最初周期" }
            ]
        }
    ]
};

