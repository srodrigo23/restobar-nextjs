'use client'
import { Card, CardFooter} from "@heroui/react";

interface SelectModeProps {
    
}
 
const SelectMode: React.FC<SelectModeProps> = () => {
    return (
        <div className="flex items-center justify-center bg-emerald-300 h-screen">
            <div className="grid grid-cols-2 gap-5 w-2/5 h-1/3">
                <Card className="">
                    <CardFooter>
                        Mesero
                    </CardFooter>
                </Card>

                <Card>
                    <CardFooter>
                        Manager
                    </CardFooter>
                </Card>

            </div>

        </div>
    );
}
 
export default SelectMode;