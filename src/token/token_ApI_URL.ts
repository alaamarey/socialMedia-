import { InjectionToken } from "@angular/core";
import { environment } from "../environments/environment.development";

export const API_URL = new InjectionToken('API_URL', {
    providedIn: "root",
    factory: () => environment.baseURL
}
)