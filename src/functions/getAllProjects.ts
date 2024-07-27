import prisma from '@/lib/prismaclient';
import getOtherUsers from './getOtherUsers';

export default async function getAllProjects() {
    const data = await getOtherUsers();

    const projects = await prisma.project.findMany({
        where: {
            memberIDs: {
                has: data?.user?.id
            }
        },
        include: {
            organizationHead: true,
        }
    })

    return {projects, otherUser: data?.otherUsers, user: data?.user};
}