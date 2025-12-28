
import { TechProduct } from './types';

export const TECH_DATA: TechProduct[] = [
  {
    id: 1,
    productA: "摩托罗拉 DynaTAC 8000X (1984年“大哥大”手机)",
    priceA: 3995,
    productB: "iPhone 16 Pro Max (1TB)",
    priceB: 1599,
    correct: "A",
    reason: "撇脂定价策略：早期科技产品针对早期采用者定价极高。"
  },
  {
    id: 2,
    productA: "索尼 PS5 游戏机 (数字版)",
    priceA: 499,
    productB: "Apple Pro Display 显示器支架 (仅支架)",
    priceB: 999,
    correct: "B",
    reason: "品牌溢价：对被锁定用户群的配件设置极高利润空间。"
  },
  {
    id: 3,
    productA: "特斯拉 Model 3 (标准续航版)",
    priceA: 38990,
    productB: "英伟达 NVIDIA H100 GPU (单块芯片)",
    priceB: 40000,
    correct: "B",
    reason: "稀缺性与核心技术：在人工智能时代，算力就是新的石油。"
  },
  {
    id: 4,
    productA: "佳能 Canon 1200mm f/5.6 镜头",
    priceA: 180000,
    productB: "保时捷 911 Carrera",
    priceB: 114000,
    correct: "A",
    reason: "边际成本：精密光学仪器的良品率极低，且制造工艺成本巨大。"
  },
  {
    id: 5,
    productA: "Vertu Signature Touch 奢侈手机",
    priceA: 11500,
    productB: "三星 Galaxy Z Fold 5 折叠屏手机",
    priceB: 1799,
    correct: "A",
    reason: "凡勃伦效应：炫耀性消费下，价格越高越能刺激富裕群体的需求。"
  },
  {
    id: 6,
    productA: "森海塞尔 Sennheiser HE-1 耳机系统",
    priceA: 59000,
    productB: "宝马 3 系 轿车 (入门款)",
    priceB: 45000,
    correct: "A",
    reason: "旗舰定价：细分领域的巅峰工程杰作可以无视常规性价比定价。"
  },
  {
    id: 7,
    productA: "AudioQuest Diamond 以太网网线 (1.5米)",
    priceA: 1000,
    productB: "红米 Redmi Note 13 手机",
    priceB: 180,
    correct: "A",
    reason: "信息不对称：利用“发烧级”神话为廉价耗材附加极高溢价。"
  },
  {
    id: 8,
    productA: "Apple Watch Edition (第一代 18K金版)",
    priceA: 17000,
    productB: "劳力士 潜航者型 (黑水鬼 零售价)",
    priceB: 10250,
    correct: "A",
    reason: "产品生命周期：科技产品贬值极快，而机械奢侈品具有保值属性。"
  },
  {
    id: 9,
    productA: "三星 110英寸 Micro LED 电视",
    priceA: 149000,
    productB: "特斯拉 Cybertruck (Cyberbeast版)",
    priceB: 99990,
    correct: "A",
    reason: "创新成本：尖端显示面板在初期的良品率极低，研发分摊成本高昂。"
  },
  {
    id: 10,
    productA: "徕卡 Leica M11 相机机身",
    priceA: 8995,
    productB: "Mac Studio (M2 Ultra 满配)",
    priceB: 6999,
    correct: "A",
    reason: "传统品牌溢价：为历史、工艺沉淀以及品牌地位支付的“仪式感”成本。"
  }
];

export const GAME_QUESTION_COUNT = 3;
export const TIMER_DURATION = 10;
