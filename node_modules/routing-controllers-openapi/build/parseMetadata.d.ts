import { MetadataArgsStorage, RoutingControllersOptions } from 'routing-controllers';
import { ActionMetadataArgs } from 'routing-controllers/metadata/args/ActionMetadataArgs';
import { ControllerMetadataArgs } from 'routing-controllers/metadata/args/ControllerMetadataArgs';
import { ParamMetadataArgs } from 'routing-controllers/metadata/args/ParamMetadataArgs';
import { ResponseHandlerMetadataArgs } from 'routing-controllers/metadata/args/ResponseHandleMetadataArgs';
export interface IRoute {
    readonly action: ActionMetadataArgs;
    readonly controller: ControllerMetadataArgs;
    readonly options: RoutingControllersOptions;
    readonly params: ParamMetadataArgs[];
    readonly responseHandlers: ResponseHandlerMetadataArgs[];
}
export declare function parseRoutes(storage: MetadataArgsStorage, options?: RoutingControllersOptions): IRoute[];
