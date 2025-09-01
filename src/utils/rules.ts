export enum SkuStatusEnum {
  PRE_CADASTRO = "PRE_CADASTRO",
  CADASTRO_COMPLETO = "CADASTRO_COMPLETO",
  ATIVO = "ATIVO",
  DESATIVADO = "DESATIVADO",
  CANCELADO = "CANCELADO",
}

export const rules: Record<
  SkuStatusEnum,
  { editablefields: string[]; statusAllowed: SkuStatusEnum[] }
> = {
  [SkuStatusEnum.PRE_CADASTRO]: {
    editablefields: ["description", "commercialDescription", "sku"],
    statusAllowed: [SkuStatusEnum.CADASTRO_COMPLETO, SkuStatusEnum.CANCELADO],
  },
  [SkuStatusEnum.CADASTRO_COMPLETO]: {
    editablefields: ["commercialDescription"],
    statusAllowed: [
      SkuStatusEnum.PRE_CADASTRO,
      SkuStatusEnum.ATIVO,
      SkuStatusEnum.CANCELADO,
    ],
  },
  [SkuStatusEnum.ATIVO]: {
    editablefields: [],
    statusAllowed: [SkuStatusEnum.DESATIVADO],
  },
  [SkuStatusEnum.DESATIVADO]: {
    editablefields: [],
    statusAllowed: [SkuStatusEnum.ATIVO, SkuStatusEnum.PRE_CADASTRO],
  },
  [SkuStatusEnum.CANCELADO]: { editablefields: [], statusAllowed: [] },
};
