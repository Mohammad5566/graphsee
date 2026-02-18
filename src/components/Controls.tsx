import { sampleEvents } from "../data/sampleEvents";

// controls for replay
const [step, setStep] = useState(0);
const events = sampleEvents;

const handleStep = () => setStep(Math.min(step + 1, events.length - 1));

const currentEvents = events.slice(0, step + 1);
function useState(arg0: number): [any, any] {
    throw new Error("Function not implemented.");
}

