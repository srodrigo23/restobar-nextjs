import { Tabs, Tab, Card, CardBody } from "@heroui/react";
interface ProductsCompProps {
  
}
 
const products = [
  {
    name: 'Alitas',
    icon: '...',
  },
  {
    name: 'Cerveza Artesanal',
    icon: '...',
  },
  {
    name: 'Soda',
    icon: '...',
  },
  {
    name: 'Refresco',
    icon: '...',
  },
  // {
  //   name: 'Alitas',
  //   icon: '...',
  // },
];
const ProductsComp: React.FC<ProductsCompProps> = () => {
  return (
    <div className='flex flex-col h-full'>
      <div className='font-semibold mb-2'>Productos disponibles</div>

      <Tabs aria-label='Options' className='flex-1 flex flex-col'>
        <Tab key='alitas' title='Alitas'>
          <Card className='h-full'>
            <CardBody className='h-full overflow-auto'>Alitas</CardBody>
          </Card>
        </Tab>
        <Tab key='cerveza' title='Cerveza Artesanal'>
          <Card className='h-full'>
            <CardBody className='h-full overflow-auto'>Cerveza artesanal</CardBody>
          </Card>
        </Tab>
        <Tab key='soda' title='Gaseosas'>
          <Card className='h-full'>
            <CardBody className='h-full overflow-auto'>Gaseosas</CardBody>
          </Card>
        </Tab>
        <Tab key='juice' title='Jugos'>
          <Card className='h-full'>
            <CardBody className='h-full overflow-auto'>Jugos y refrescos</CardBody>
          </Card>
        </Tab>
      </Tabs>

      {/* <ul>
        {products.map((element, index) => {
          return <li key={index}>{element.name}</li>;
        })}
      </ul> */}
    </div>
  );
}
 
export default ProductsComp;