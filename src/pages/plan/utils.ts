import { Pages } from "@/utils/url";
import { Plan, PlanState, PlanType } from "@/apis/schemas";

export const planTypeMap = (type: PlanType) => {
  if (type === PlanType.TypeFeed) return "零食奖励";
  else if (type === PlanType.TypeCastrate) return "绝育计划";
  else if (type === PlanType.TypeHeal) return "生理健康";
  else if (type === PlanType.TypeSupply) return "物资补给";
  return "其它";
};

export const planStateMap = (state: PlanState) => {
  if (state === PlanState.StateFunding) return "募集中";
  else if (state === PlanState.StateDoing) return "执行中";
  else if (state === PlanState.StateComplete) return "已完成";
  return "未知";
};

export function onClickPlan(id: string) {
  uni.navigateTo({
    url: `${Pages.PlanDetails}?id=${id}`
  });
}
