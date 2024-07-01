import { Location } from "../../core/domain/location.entity";

export interface LocationRepository {
    getLocationData(zipcode: string): Promise<Location>;
}
