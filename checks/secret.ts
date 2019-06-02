import { getUrl } from "../lib/url";
import fetch from "node-fetch";
import { Project } from "../interfaces/Project";

export const checkSecret = async (project: Project) => {
    
    try {
        const response = await fetch(getUrl(project.url, 'v1/query'), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-hasura-admin-secret": project.secret,
            },
            body: JSON.stringify({
                "type": "run_sql",
                "args": {
                    "sql": "select 1"
                }
            }),
        });

        return response.status === 200 && (await response.json()).result_type === 'TuplesOk';
    } catch (e) {
        return false;
    }

}
