import { HttpService } from "@nestjs/axios";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AxiosError } from "axios";
import { Location } from "../../core/domain/location.entity";
import { LocationRepository } from "../../ports/location/location.repository";
import { catchError, firstValueFrom } from 'rxjs';
import { locationApi } from "src/shared/config";

@Injectable()
export class ViaCepLocationRepository implements LocationRepository {
    constructor(private readonly httpService: HttpService) { }

    async getLocationData(zipcode: string): Promise<Location> {
        const url = locationApi.url.replace('{zipcode}', zipcode.replace(/\D/g, ''));
        const { data } = await firstValueFrom(
            this.httpService.get<Location>(url).pipe(
                catchError((error: AxiosError) => {
                    console.log(error.response.data)
                    throw new HttpException({
                        status: HttpStatus.BAD_REQUEST,
                        error: "Invalid provided zipcode or ViaCep API unavaliable",
                    }, HttpStatus.BAD_REQUEST, {
                        cause: 'Invalid data'
                    });

                })
            )
        );
        return data;
    }
}

