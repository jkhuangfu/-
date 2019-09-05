# 有一小盆友想对自己电脑中的格式不同但名称相同得音乐文件进行去重，于是它来了：
# 使用方法：
# 1、修改你要删除的文件格式
# 2、把此文件放在需要的去重的文件同目录
# 3、运行此文件即可

import os

# 你要删除的文件格式
del_type = '.txt'

# 需要处理的文件路径
file_path = os.path.join(os.getcwd(),'')


def get_all_file_name(source_path):
    file_name_arr = []
    for root, dirs, files in os.walk(source_path):
        for file in files:
            file_name_arr.append(os.path.splitext(file)[0])
    return file_name_arr


def repeat_num(_array):
    seen = set()
    duplicated = set()
    for x in _array:
        if x not in seen:
            seen.add(x)
        else:
            duplicated.add(x)
    return duplicated


def del_file(file_arr):
    for file_name in file_arr:
        if os.path.exists(file_path + file_name + del_type):
            os.remove(file_path + file_name + del_type)


res = repeat_num(get_all_file_name(file_path))


print('重复文件名---->' , res)

del_file(res)
