import { Debuff, Player } from "../Player";
import { Role } from "../gameState";

export type DamageProfile = {
  split: boolean;
  damage: number;
  instaKill: Debuff | null;
  debuffRequirement: Debuff | null;
  roleRequirement: Role | null;
};

export const SimpleKillProfile: DamageProfile = {
  split: false,
  damage: 1,
  instaKill: null,
  debuffRequirement: null,
  roleRequirement: null,
};

export const ZeroDamageProfile: DamageProfile = {
  split: false,
  damage: 0,
  instaKill: null,
  debuffRequirement: null,
  roleRequirement: null,
};

export const SimpleHeavyDamageProfile: DamageProfile = {
  split: false,
  damage: 0.8,
  instaKill: null,
  debuffRequirement: null,
  roleRequirement: null,
};

export type DisplayOptions = {
  color?: string;
};

export const calculateDamageProfile = (
  player: Player,
  damageProfile: DamageProfile,
  totalHit: number
) => {
  let damage = 0;
  if (
    damageProfile.debuffRequirement !== null &&
    player.debuffs.every(
      (deb) => deb.name !== damageProfile.debuffRequirement?.name
    )
  ) {
    damage = 2;
  } else if (
    damageProfile.instaKill !== null &&
    player.debuffs.some((deb) => deb === damageProfile.instaKill)
  ) {
    damage = 2;
  } else if (
    damageProfile.roleRequirement != null &&
    player.role !== damageProfile.roleRequirement
  ) {
    damage = 2;
  } else if (damageProfile.split) {
    damage = damageProfile.damage / totalHit;
  } else {
    damage = damageProfile.damage;
  }
  return damage;
};
