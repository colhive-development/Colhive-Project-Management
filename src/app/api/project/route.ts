import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaclient";

export async function POST(request: NextRequest) {
    try{
        const {name, description, githubLink, organizationHeadID, memberIDs} = await request.json();
        
        const newProject = await prisma.project.create({
            data:{
                name,
                description,
                githubLink,
                organizationHeadID,
                memberIDs
            }
        });

        return NextResponse.json({
            status: 200,
            message: "Project Created Successfully.",
            project: newProject,
        }, {status: 200});
        
    } catch (error: any){
        console.log(error);
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error",
            project: null
        }, {status: 500});
    }

}