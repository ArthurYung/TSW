/* !
 * Tencent is pleased to support the open source community by making Tencent Server Web available.
 * Copyright (C) 2018 THL A29 Limited, a Tencent company. All rights reserved.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
 * http://opensource.org/licenses/MIT
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

import util from 'util'

export const ConsoleHack = () => {
    if (!global[__filename]) {
        global[__filename] = true
        process.nextTick(() => {
            const logger = require('logger')
            /* eslint-disable no-console */
            console.debug = (log => {
                return (...args) => {
                    return logger.writeLog(
                        'DEBUG',
                        `${util.format.apply(null, args)}`,
                    )
                }
            })((console.originDebug = console.debug))

            console.log = (log => {
                return (...args) => {
                    return logger.writeLog(
                        'DEBUG',
                        `${util.format.apply(null, args)}`,
                    )
                }
            })((console.originLog = console.log))

            console.info = (log => {
                return (...args) => {
                    return logger.writeLog(
                        'INFO',
                        `${util.format.apply(null, args)}`,
                    )
                }
            })((console.originInfo = console.info))

            console.dir = (log => {
                return function(object, options) {
                    options = Object.assign(
                        {
                            customInspect: false,
                        },
                        options,
                    )
                    return logger.writeLog(
                        'INFO',
                        `${util.inspect(object, options)}`,
                    )
                }
            })((console.originDir = console.dir))

            console.warn = (log => {
                return (...args) => {
                    return logger.writeLog(
                        'WARN',
                        `${util.format.apply(null, args)}`,
                    )
                }
            })((console.originWarn = console.warn))

            console.error = (log => {
                return (...args) => {
                    return logger.writeLog(
                        'ERROR',
                        `${util.format.apply(null, args)}`,
                    )
                }
            })((console.originError = console.error))

            /* eslint-enable no-console */
        })
    }
}