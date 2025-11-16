import NavbarComp from "@/componests/shared/NavbarComp";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <section>
      <NavbarComp label={'La Hermandad'} />
      {children}
    </section>
  );
}