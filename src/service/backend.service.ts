import { type AstTopLayer, type Site } from "@samply/lens";
import { v4 as uuidv4 } from "uuid";
import { Spot } from "./spot";

export const requestBackend = (ast: AstTopLayer, updateResponse: (response: Map<string, Site>) => void, abortController: AbortController) => {

    const queryId = uuidv4();
    const query = { lang: "ast", payload: btoa(decodeURI(JSON.stringify({ast: ast, id: queryId.concat("__search__").concat(queryId) }))) };

    const siteList: string[] =         [
        'aachen',
        'augsburg',
        'berlin',
        'bonn-test',
        'dresden',
        'essen',
        'frankfurt',
        'freiburg',
        'freiburg-test',
        'goettingen',
        'heidelberg',
        'hannover',
        'luebeck',
        'mannheim',
        'mainz',
        'muenster',
        'marburg',
        'regensburg',
        'wuerzburg'
      ];


    const backend = new Spot(new URL("https://samplelocator.test.bbmri.de/backend/"), siteList, queryId);

    backend.send(
        btoa(decodeURI(JSON.stringify(query))),
        updateResponse,
        abortController,
    );
}