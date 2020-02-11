var NodesConfig = {
    "name":"funcA(i,x,data)", // 节点名称
    "connect":"", // 连线文字
    "type":0, // 类型 0 起点， 1 普通节点, 2功能节点， 9 终结点
    "filepath":"/a/b/c.lua", // 文件路径
    "line":25, // 所在行数
    "module":"", // 模块名(类名)
    "next":[
        {
            "name":"if",
            "connect":"",
            "type":2,
            "module":"",
            "next":[
                {
                    "name":"funcE(x,y)",
                    "connect":"x == 0",
                    "type":1,
                    "module":"",
                    "next":[
                        {
                            "name":"end",
                            "connect":"",
                            "type":9,
                            "module":"",
                            "next":[]
                        }
                    ]
                },
                {
                    "name":"funcC(data)",
                    "connect":"x > 0",
                    "type":1,
                    "module":"",
                    "next":[
                        {
                            "name":"funcD(args)",
                            "connect":"",
                            "type":1,
                            "module":"",
                            "next":[
                                {
                                    "name":"end",
                                    "connect":"",
                                    "type":9,
                                    "module":"",
                                    "next":[]
                                }
                            ]
                        }
                    ]
                },
                {
                    "name":"funcF(a.data,b.r,z.id)",
                    "connect":"else",
                    "type":1,
                    "module":"",
                    "next":[
                        {
                            "name":"for",
                            "connect":"",
                            "type":2,
                            "module":"",
                            "next":[
                                {
                                    "name":"funcK(i)",
                                    "connect":"i < value",
                                    "type":1,
                                    "module":"",
                                    "next":[
                                        
                                    ]
                                },
                                {
                                    "name":"funcM(t.ax)",
                                    "connect":"for out",
                                    "type":1,
                                    "module":"",
                                    "next":[
                                        {
                                            "name":"end",
                                            "connect":"",
                                            "type":9,
                                            "module":"",
                                            "next":[]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}