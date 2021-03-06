export interface route {
    path: string;
    view: any;
}
export interface Potion {
    type: 'potion'
    src: string;
    name: string;
    description?: string;
    initialCost: number;
    properties: {
        strength: number | null;
        physicalEndurance: number | null;
        defence: number | null;
        luck: number | null;
    }
}
export interface ChestPlate {
    type: 'chestPlate'
    name: string
    rarity: 'common' | 'legendary'
    src: string
    description?: string;
    initialCost: number;
    properties: {
        strength: number | null;
        physicalEndurance: number | null;
        defence: number | null;
        luck: number | null
    }
}

export interface Gloves {
    type: 'gloves';
    name: string;
    rarity: 'common' | 'legendary';
    src: string;
    description?: string;
    initialCost: number;
    properties: {
        strength: number | null;
        physicalEndurance: number | null;
        defence: number | null;
        luck: number | null
    }
}
export interface ShopItem {
    type: 'helmet' | 'shield' | 'special' | 'weapon' | 'potion' | 'chestPlate' | 'gloves' | 'gold';
    name: string;
    rarity: 'common' | 'legendary';
    src: string;
    description?: string;
    initialCost: number;
    properties: {
        strength: number | null;
        physicalEndurance: number | null;
        defence: number | null;
        luck: number | null
    }
    id: string
}
export interface UserData {
    level: number;
    nextLevelAt: number
    nick: string;
    guardPayout: number;
    gold: number;
    equipmentItems: ShopItem[];
    backpackItems: ShopItem[];
    lastVisit: Date
    status: 'free' | 'guard' | 'mission';
    description: string;
    portrait: string;
    exp: number;
    wizardWheelSpin: boolean;
    availableMissions: MissionData[];
    missionWillingness: number;
    currentMission: CurrentMission | null;
    friends: FriendData[];
    inbox: MailData[];
    shop: {
        blacksmith: ShopItem[];
    };
    shopPicks: {
        blacksmith: AvailableMarketPicks[];
    }
    rawStats: {
        strength: number;
        physicalEndurance: number;
        defence: number;
        luck: number;
    }
    stats: {
        damage: number;
        health: number;
        damageReduce: number
        critical: number
    }

    guard: {
        current: Date | null;
        start: Date | null;
        end: Date | null;
        payout: number | null;
    }
    pet: null | PetData;
    potions: {
        first: {
            id: string;
            end: Date;
        } | null;
        second: {
            id: string;
            end: Date;
        } | null;
    }

    magicWheel: {
        items: ShopItem[];
        wonItem: ShopItem;
    }

}
export interface FriendData {
    nick: string;
    id: string;
}
export interface PetProperties {
    travelTime: number | null;
    defence: number | null;
    physicalEndurance: number | null;
    strength: number | null;
    luck: number | null
}
export interface PetData {
    name: string;
    imgSrc: string;
    imgSmallSrc: string;
    initialCost: number;
    properties: PetProperties
    id: string;
    rentEnd?: Date;
}
export interface AvailableMarketPicks {
    picks: number;
    index: number;
}
export interface UserStats {
    strength: number;
    physicalEndurance: number;
    defence: number;
    luck: number;
}
export interface FullUserStats {
    strength: number;
    damage: number;
    physicalEndurance: number;
    health: number;
    defence: number
    damageReduce: number;
    luck: number;
    critical: number;
}
export interface MissionData {
    exp: number;
    gold: number;
    title: string;
    dsc: string;
    id: string;
    time: number;
    papyrus: string;
    character: string;
    monster: MonsterData
    background: {
        attribute: string;
        src: string;
    }
}
export interface MonsterData {
    src: string;
    strength: number;
    damage: number;
    physicalEndurance: number;
    health: number;
    defence: number
    damageReduce: number;
    luck: number;
    critical: number;
}
export interface SearchedUserData {
    description: string;
    equipmentItems: ShopItem[];
    exp: number;
    level: number;
    portrait: string;
    potions: {
        first: {
            id: string;
            end: Date;
        } | null;
        second: {
            id: string;
            end: Date;
        } | null;
    };
    status: 'free' | 'guard' | 'mission';
    nick: string;
    lastVisit: Date;
    id: string;
    pet: PetData | null;
    rawStats: {
        strength: number;
        physicalEndurance: number;
        defence: number;
        luck: number;
    }
    confirmedFriend: boolean;
    nextLevelAt: number;
}
export interface MessageData {
    content: string[];
    createdAt: Date;
    userId: string;
    nick: string;
}

export interface Conversation {
    messages: MessageData[];
    createdAt: Date;
    participants: string[];
    updatedAt: Date;
    createdBy: string
    recipientId: string;
}
export interface MailData {
    title: string;
    createdAt: Date;
    createdBy: string;
    content: string;
    id: string;
}
export interface CurrentMission {
    id: string;
    exp: number;
    gold: number;
    title: string;
    time: number;
    character: string;
    monster: MonsterData;
    background: {
        attribute: string;
        src: string;
    }
    start: Date;
    end: Date;
}