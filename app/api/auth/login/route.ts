// import Requ


export async function POST(req: Request){
    const { username, password } = await req.json();

    const user = await prisma.user.findUnique()

}