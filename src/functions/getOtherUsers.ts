import prisma from '@/lib/prismaclient';
import getCurrentUser from './getCurrentUser';

export default async function getOtherUsers() {
    try {
        const user = await getCurrentUser();
        
        const otherUsers = await prisma.user.findMany({
            where: {
                companyCode: user?.companyCode,
                AND:{
                    NOT: {
                        id: user?.id
                    }
                }
            },
        });
        
        return {otherUsers, user};
    } catch (error: any){
        console.log(error);
    }
}