export interface AbilityDTO {
  name: string;
  id: number;
  effect_entries: {
    effect: string;
  }[];
}
