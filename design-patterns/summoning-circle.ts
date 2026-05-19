interface Creature {
	name: string;
	useAbility: () => void;
}

export class Dragon implements Creature {
	name = "Dragon";

	useAbility() {
		console.log("Breathes fire");
	}
}
export class Phoenix implements Creature {
	name = "Phoenix";

	useAbility() {
		console.log("Something with air");
	}
}
export class Unicorn implements Creature {
	name = "Unicorn";

	useAbility() {
		console.log("Something with sparkles");
	}
}

type Ingridient = "fire" | "air" | "sparkles";

function createCreature(ingridientType: Ingridient) {
	switch (ingridientType) {
		case "fire":
			return new Dragon();

		case "air":
			return new Phoenix();

		case "sparkles":
			return new Unicorn();

		default:
			throw new Error("Unknown ingridientType");
	}
}

class SummoningCircle {
	summon(ingridientType: Ingridient) {
		const creature = createCreature(ingridientType);
		return creature;
	}
}

const creature = new SummoningCircle();
console.log(creature.summon("air").useAbility());
