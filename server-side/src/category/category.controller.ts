import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Auth } from "src/auth/decorators/auth.decorator";
import { CategoryService } from "./category.service";
import { CategoryDto } from "./dto/category.dto";
import { Roles } from "src/auth/decorators/roles.decorator";
import { UserRole } from "@prisma/client";

@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll() {
    return this.categoryService.getAll();
  }

  @Get("by-id/:id")
  async getById(@Param("id") id: string) {
    return this.categoryService.getById(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Roles(UserRole.MANAGER, UserRole.ADMIN, UserRole.CREATOR)
  @Post()
  async create(@Body() dto: CategoryDto) {
    return this.categoryService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Roles(UserRole.MANAGER, UserRole.ADMIN, UserRole.CREATOR)
  @Put(":id")
  async update(@Param("id") id: string, @Body() dto: CategoryDto) {
    return this.categoryService.update(id, dto);
  }

  @HttpCode(200)
  @Auth()
  @Roles(UserRole.MANAGER, UserRole.ADMIN, UserRole.CREATOR)
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.categoryService.delete(id);
  }
}
