import { newQuickJSWASMModuleFromVariant } from "quickjs-emscripten-core"
import releaseVariant from "@jitl/quickjs-wasmfile-release-sync"
export const QuickJS = await newQuickJSWASMModuleFromVariant(releaseVariant)
