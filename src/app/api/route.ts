import {NextResponse } from "next/server";
import { prisma } from "../lib/prisma";

export async function GET() {  
    const books = await prisma.book.findMany({
    });
    let json_response = {
      status: "success",
      results: books.length,
      books,
    };
    return NextResponse.json(json_response);
  }
  
  export async function POST(request: Request) {
    try {
      const json = await request.json();
      let feedback;
      if (json.id) {
        const id = json.id;
        feedback = await prisma.book.update({
          where: {
            id: id,
          },
          data: json,
        });
      } else {
        feedback = await prisma.book.create({
          data: json,
        });
      }
      const json_response = {
        status: "success",
        data: {
          feedback,
        },
      };
      return new Response(JSON.stringify(json_response), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error: any) {
      const error_response = {
        status: "error",
        message: error.message,
      };
      return new Response(JSON.stringify(error_response), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  export async function DELETE(request: Request) {
    try {
      const json = await request.json();
      if (json.id) {
        const id = json.id;
        const feedback = await prisma.book.delete({
          where: {
            id: id,
          },
        });
  
        if (feedback) {
          const json_response = {
            status: "success",
            data: {
              feedback,
            },
          };
          return new Response(JSON.stringify(json_response), {
            status: 201,
            headers: { "Content-Type": "application/json" },
          });
        } else {
          const error_response = {
            status: "error",
            message: "Deletion failed or the book does not exist.",
          };
          return new Response(JSON.stringify(error_response), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      } else {
        const error_response = {
          status: "error",
          message: "Invalid request. 'id' is required in the JSON data."
        };
        return new Response(JSON.stringify(error_response), {
          status: 400, 
          headers: { "Content-Type": "application/json" },
        });
      }
    } catch (error: any) {
      const error_response = {
        status: "error",
        message: error.message,
      };
      return new Response(JSON.stringify(error_response), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  
  