import { useOrder } from "@/context/OrderContext";
import { useState } from "react";
import { Button, RadioGroup, Radio} from "@heroui/react";

interface DrinksCompProps {}

export const DrinksComp: React.FC<DrinksCompProps> = () => {
  const { addOrderItem } = useOrder();

  const [bottleDrinkSelected, setBottleDrinkSelected] = useState<string|null>(null)

  const bottleDrinks = [
    {
      id: 'whiski-negra',
      label: 'Whiski Negra',
      price: 480,
    },
    {
      id: 'ron-abuelo',
      label: 'Ron Abuelo',
      price: 250,
    },
    {
      id: 'casa-real',
      label: 'Casa Real',
      price: 180,
    },
    {
      id: 'fernet-branca',
      label: 'Fernet Branca',
      price: 250,
    },
    {
      id: 'ron-habanna',
      label: 'Ron Habanna',
      price: 200,
    },
  ];

  const jars = [
    {
      id: 'fernet-jar',
      label: 'Jarra de Fernet',
      price: 60,
    },
  ];
  
  const addFernetToOrder = () => {
    const newOrderItem = {
      id: `${Date.now()}-fernet`,
      productType: 'drinks' as const,
      description: 'Fernet con Coca-Cola (incluye hielo)',
      quantity: 1,
      price: 45,
      details: {},
    };

    addOrderItem(newOrderItem);
  };

  return (
    <div className='space-y-6'>
      <div className='bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg border border-orange-200'>
        <h3 className='text-lg font-bold text-orange-800 mb-3 flex items-center gap-2'>
          Botellas
        </h3>
        <RadioGroup
          value={bottleDrinkSelected}
          onValueChange={setBottleDrinkSelected}
        >
          <div className='flex flex-col gap-3'>
            {bottleDrinks.map((bottleDrink) => (
              <Radio
                key={bottleDrink.id}
                value={bottleDrink.id}
                className='p-2'
              >
                <div className='flex items-center w-full gap-1.5'>
                  <span className='text-xl'>{bottleDrink.label}</span>
                  <span className='text-xs text-gray-400'>
                    Bs.- {bottleDrink.price}
                  </span>
                </div>
              </Radio>
            ))}
          </div>
        </RadioGroup>
      </div>

      <div className='bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg border border-orange-200'>
        <h3 className='text-lg font-bold text-orange-800 mb-3 flex items-center gap-2'>
          Jarras Preparadas
        </h3>
        <RadioGroup
          value={bottleDrinkSelected}
          onValueChange={setBottleDrinkSelected}
        >
          <div className='flex flex-col gap-3'>
            {jars.map((jar) => (
              <Radio key={jar.id} value={jar.id} className='p-2'>
                <div className='flex items-center w-full gap-1.5'>
                  <span className='text-xl'>{jar.label}</span>
                  <span className='text-xs text-gray-400'>
                    Bs.- {jar.price}
                  </span>
                </div>
              </Radio>
            ))}
          </div>
        </RadioGroup>
      </div>
      <Button
        color='secondary'
        onPress={addFernetToOrder}
        size='lg'
        className='w-full font-bold'
      >
        Agregar al Pedido
      </Button>
    </div>
  );
};
