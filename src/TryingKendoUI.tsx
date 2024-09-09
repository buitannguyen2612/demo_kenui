import { DateInput } from "@progress/kendo-react-dateinputs";
import { Button } from "@progress/kendo-react-buttons";

type Props = {
    
};

const TryingKendoUI = (props:Props) => {


    const today = new Date();


    return (
        <div>
                 <DateInput
                    width="100%"
                    name="checkin"
                    required={true}
                    min={today}
                  />
                    <Button themeColor={"primary"}>Search</Button>
        </div>
    );
};



export default TryingKendoUI;