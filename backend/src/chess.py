from engine_wrapper import EngineWrapper
import subprocess
import time

class Chess:
    def __init__(self, ai_name):
        self.engine_wrapper = EngineWrapper([], 5)
        self.ai_name = ai_name
    
    def get_move_from_ai(self, boardstate):
        return subprocess.run(["python", f"src/{self.ai_name}", f"-b {','.join(boardstate)}"], stdout=subprocess.PIPE).stdout.decode('utf-8')
    
    def get_move_from_self(self):
        return self.engine_wrapper.calculate_move()
        
    def play(self, turns, delay):
        self.print_board()
        time.sleep(delay)

        for _ in range(turns):
            self_move = self.get_move_from_self()

            try:
                self.engine_wrapper.engine.make_moves_from_current_position([self_move])
            except:
                print(self.engine_wrapper.engine.get_evaluation())
                break
            
            self.engine_wrapper.boardstate.append(self_move)

            self.print_board()
            time.sleep(delay)

            ai_move = self.get_move_from_ai(self.engine_wrapper.boardstate)

            try:
                self.engine_wrapper.engine.make_moves_from_current_position([ai_move])
            except:
                print(self.engine_wrapper.engine.get_evaluation())
                break

            self.engine_wrapper.boardstate.append(ai_move)

            self.print_board()
            time.sleep(delay)

        self.print_board()
        print(self.engine_wrapper.engine.get_evaluation())

    def print_board(self):
        print(self.engine_wrapper.engine.get_board_visual())
        print(self.engine_wrapper.boardstate)



if __name__ == "__main__":
    c = Chess("test_ai.py")
    c.play(1000, 0.1)
    