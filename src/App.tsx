import { Structure } from "./components/data/Structure";
import StructPanel from "./components/panel/struct-panel/StructPanel";

const wheatFarm:Structure = {
    level: 1,
    name:"Wheat Farm",
    funds: 100,
    workers: [
    { name: "Peasant", icon: "👩‍🌾", description: "", number: 8, wage: 1.0 },
    { name: "Farmer", icon: "🤠", description: "", number: 2, wage: 1.5 },
  ],
    inventory: {
        entries: [
            {
                quantity: 10,
                product: {
                    name: "Wheat",
                    icon: "🌾",
                    description: "",
                    category: "FOOD",
                    base_value: 1.0,
                    transport_cost: 1.2,
                },
            }
        ],
    },
};

function App() {
    return <StructPanel structure={wheatFarm} />;
}

export default App;