import { Host } from "@dashg-enterprises/ddd-platform";
import { Container } from "inversify";
import { TYPES } from "./TYPES";
import { IExampleRepository } from "./infrastructure/IExampleRepository";
import { IExampleController } from "../view-api/presentation/IExampleController";
import ExampleController from "../view-api/presentation/ExampleController";
import { Example, ExampleMetadata } from "./infrastructure/Example";
import { ExamplePartitionKey, ExampleRepository, ExampleSortKey } from "./infrastructure/ExampleRepository";

// lambda.js
// import serverlessExpress from '@codegenie/serverless-express';
// import express from 'express';
// exports.handler = serverlessExpress({ app })

export const host = new Host()
    .withMaterializedView<
        Example,
        ExamplePartitionKey,
        ExampleSortKey,
        ExampleRepository,
        IExampleRepository,
        ExampleController,
        IExampleController
    >(Example, ExampleRepository, TYPES.IExampleRepository, ExampleController, TYPES.IExampleController);