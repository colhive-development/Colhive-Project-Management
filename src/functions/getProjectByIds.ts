import prisma from "@/lib/prismaclient";

export default async function getProjectById(projectID: string) {
    const project = await prisma.project.findFirst({
        where: {
            id: projectID
        },
        include: {
            organizationHead: true,
            members: true,
            subProjects: true,
            taskAssignedToTeam: true
        }
    });

    return project;
}