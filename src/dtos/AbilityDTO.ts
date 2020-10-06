export interface AbilityDTO {
  name: string;
  id: number;
  effect_entries: {
    language: {
      name: string;
    };
    effect: string;
  }[];
}
