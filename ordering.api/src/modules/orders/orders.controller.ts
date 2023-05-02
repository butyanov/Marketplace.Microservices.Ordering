import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards
} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { PaginationDto } from "./dto/pagination.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserPermissionsPresets } from "../auth/support-types/user-permissions-presets";
import { Permissions } from "../auth/decorators/user-permissions-decorator";
import { AuthenticationGuard } from "../auth/authentication.guard";
import { AuthorizationGuard } from "../auth/authorization.guard";

@ApiTags("orders")
@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {
  }

  @ApiBearerAuth()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Permissions(UserPermissionsPresets.user)
  @Post("orders")
  async create(@Req() request, @Body() createOrderBody: CreateOrderDto) {
    return await this.ordersService.add(createOrderBody);
  }

  @ApiBearerAuth()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Permissions(UserPermissionsPresets.user)
  @Get("orders")
  async findAll(@Req() request, @Query() paginationQuery: PaginationDto) {
    const { skip, take } = paginationQuery;
    return await this.ordersService.findAll({ skip, take });
  }

  @ApiBearerAuth()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Permissions(UserPermissionsPresets.user)
  @Get("users/:userId/orders")
  async findRange(@Req() request, @Param("userId", ParseUUIDPipe) userId: string, @Query() paginationQuery: PaginationDto) {
    const { skip, take } = paginationQuery;
    return this.ordersService.findRangeByUserId(userId, { skip, take });
  }

  @ApiBearerAuth()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Permissions(UserPermissionsPresets.user)
  @Get(":id")
  async findOne(@Req() request, @Param("id", ParseUUIDPipe) id: string) {
    return await this.ordersService.findOneById(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Permissions(UserPermissionsPresets.user)
  @Patch("orders/:id/status")
  async updateStatus(@Req() request, @Param("id", ParseUUIDPipe) id: string, @Body() updateOrderBody: UpdateOrderDto) {
    return await this.ordersService.updateStatus(id, updateOrderBody.status);
  }

  @ApiBearerAuth()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Permissions(UserPermissionsPresets.user)
  @Delete("orders/:id")
  async remove(@Req() request, @Param("id", ParseUUIDPipe) id: string) {
    return await this.ordersService.removeById(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Permissions(UserPermissionsPresets.user)
  @Delete("users/:userId/orders")
  async removeRange(@Req() request, @Param("userId", ParseUUIDPipe) userId: string) {
    return await this.ordersService.removeRangeByUserId(userId);
  }
}
