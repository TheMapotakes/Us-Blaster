// remote.ts
import { connectPipe } from 'rpcs'
import { parentPort } from 'worker_threads'
 
const pipe = {
  name: 'name from remote',
  sayHi() {
    return "hi, I'm from remote side."
  }
}
 
export type Remote = typeof pipe
 
connectPipe(pipe, parentPort)
// local.ts
import { connectPipe } from 'rpcs'
import { Worker } from 'worker_threads'
import type { Remote } from './remote' // NOTICE: we only import type from remote for code hints
;(async function main() {
  const rpc = connectPipe<Remote, Worker>(new Worker('./remote.js'))
 
  const name = await rpc.name // name from remote side
  const hi = await rpc.sayHi('time') // return 'hi, I\'m from remote side.' string
})()
