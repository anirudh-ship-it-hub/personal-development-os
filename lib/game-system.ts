export function getLevelTitle(level: number) {
    if (level >= 50) return "Mastermind";
    if (level >= 30) return "Architect";
    if (level >= 20) return "Strategist";
    if (level >= 10) return "Builder";
    if (level >= 5) return "Pathfinder";
  
    return "Explorer";
  }