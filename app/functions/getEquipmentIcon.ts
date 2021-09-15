
export const getEquipmentIconSrc = (itemType: string) : string => {
    switch (itemType) {
        case 'helmet':
            return '/images/profile_equipment_helmet.png';

        case 'shield':
            return '/images/profile_equipment_shield.png';

        case 'special':
            return '/images/profile_equipment_special.png';

        case 'weapon':
            return '/images/profile_equipment_weapon.png';

        case 'chestPlate':
            return '/images/profile_equipment_armor.png';

        case 'gloves':
            return '/images/profile_equipment_gloves.png';

        default:
            return '';
    }
}