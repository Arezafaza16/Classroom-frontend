import { BACKEND_BASE_URL } from "@/constant";
import { ListResponse } from "@/types";
import { createDataProvider, CreateDataProviderOptions } from "@refinedev/rest";


if (!BACKEND_BASE_URL)
    throw new Error("BACKEND_BASE_URL is not configured");

const options: CreateDataProviderOptions = {
    getList: {
        getEndpoint: ({resource}) => {
            console.log(resource, "ini resource");
            
            return resource
        },
        buildQueryParams: async ({resource, pagination, filters }) => {
           const page = pagination?.currentPage ?? 1;
           const pageSize = pagination?.pageSize ?? 10;

           const params: Record<string, string | number> = { page, limit: pageSize};

           filters?.forEach((filter) => {
            const field = 'field' in filter ? filter.field : '';
            
            const value = String(filter.value);

            if(resource === 'subjects'){
                if(field === 'department') params.department = value;
                if(field === 'name' || field === 'code') params.search = value;
            }
           })

           return params;
        },
        mapResponse: async (response) => {
            console.log(response, "ini response MAP");
            
            const payload: ListResponse = await response.clone().json();
            console.log(payload, "ini payload");
            
            return payload.data ?? [];
        },
        getTotalCount: async (response) => {
            console.log(response, "ini response GET TOTAL COUNT");
            const payload: ListResponse = await response.clone().json();
            return payload.pagination?.total ?? payload.data?.length ?? 0;
        }
    }
}

export const {dataProvider} = createDataProvider(BACKEND_BASE_URL, options);