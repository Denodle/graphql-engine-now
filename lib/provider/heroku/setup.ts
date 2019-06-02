import fetch from "node-fetch";
import { Project } from "../../../interfaces/Project";
import generator from 'generate-password';

const BASE_URL = "https://api.heroku.com";

interface CreateConfig {
    region: string;
}

export const setupHeroku = async (token: string, project: Project, config: CreateConfig) => {

    try {
        const id = generator.generate({
            length: 3,
            uppercase: false,
        })

        const respions = await fetch(`${BASE_URL}/app-setups`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/vnd.heroku+json; version=3",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                app: {
                    name: 'hasura-' + project.api.name + '-' + id,
                    region: config.region,
                },
                source_blob: {
                    checksum: "SHA256:a4752c5080d977d06a6c1caf2a8351c5cae93db80dcd589db4ecb4286d0cf444",
                    url: "https://github.com/hasura/graphql-engine-heroku/tarball/master",
                    version: "v0.0.0",
                },
                overrides: {
                    env: {
                        HASURA_GRAPHQL_ADMIN_SECRET: project.secret,
                    },
                },
            }),
        });
        
        return true;
    } catch (e) {
        return false;
    }

};