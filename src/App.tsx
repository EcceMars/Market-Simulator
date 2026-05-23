import type { Structure } from "./components/data/StructureObj";
import type { StructureType } from "./components/data/StructureRes";
import StructPanel from "./components/panel/struct-panel/StructPanel";

const wheatFarmTemplate: StructureType = {
    name: "Wheat Farm",
    icon: "🌾",
    description: "A small farm that produces wheat.",
    workforce: [
        { workerType: { name: "Peasant", icon: "👩‍🌾", description: "", strata: "LOW", needs: [] }, number: 8 },
        { workerType: { name: "Farmer",  icon: "🤠",   description: "", strata: "MID", needs: [] }, number: 2 },
    ],
    inputs: [],
    outputs: [
        { product: { name: "Wheat", icon: "🌾", description: "", category: "FOOD", base_value: 1.0, transport_cost: 1.2 }, quantity: 10 },
    ],
};

const wheatFarm: Structure = {
    template: wheatFarmTemplate,
    level: 1,
    funds: 100,
    workers: [
        { workerType: wheatFarmTemplate.workforce[0].workerType, currentCount: 8,  offeredWage: 1.0 },
        { workerType: wheatFarmTemplate.workforce[1].workerType, currentCount: 2,  offeredWage: 1.5 },
    ],
    inventory: {
        entries: [
            { product: wheatFarmTemplate.outputs[0].product, quantity: 10 },
        ],
    },
};

function App() {
    return <StructPanel structure={wheatFarm} />;
}

export default App;